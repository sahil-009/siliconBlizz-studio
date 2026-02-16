import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN_NAME = 'siliconblizz.in';

async function setupDomain() {
    console.log('🔍 Checking Resend domain configuration...\n');

    try {
        // List all domains
        console.log('📋 Fetching all domains...');
        const { data: domains } = await resend.domains.list();

        console.log(`Found ${domains?.data?.length || 0} domain(s):\n`);

        if (domains?.data && domains.data.length > 0) {
            domains.data.forEach((domain, index) => {
                console.log(`${index + 1}. ${domain.name}`);
                console.log(`   ID: ${domain.id}`);
                console.log(`   Status: ${domain.status}`);
                console.log(`   Region: ${domain.region || 'Not specified'}`);
                console.log('');
            });

            // Check if our domain exists
            const existingDomain = domains.data.find(d => d.name === DOMAIN_NAME);

            if (existingDomain) {
                console.log(`✅ Domain "${DOMAIN_NAME}" is already configured!`);
                console.log(`   Status: ${existingDomain.status}\n`);

                // Get detailed information
                console.log('📝 Fetching DNS records...');
                const { data: domainDetails } = await resend.domains.get(existingDomain.id);

                if (domainDetails?.records) {
                    console.log('\n🔑 DNS Records to add to your domain registrar:\n');
                    domainDetails.records.forEach((record, index) => {
                        console.log(`Record ${index + 1}:`);
                        console.log(`   Type: ${record.type}`);
                        console.log(`   Name: ${record.name}`);
                        console.log(`   Value: ${record.value}`);
                        console.log(`   Status: ${record.status || 'Pending verification'}`);
                        console.log('');
                    });
                }

                if (existingDomain.status === 'verified') {
                    console.log('✅ Your domain is fully verified and ready to send emails!');
                } else {
                    console.log('⏳ Domain is pending verification. Add the DNS records above to your domain registrar.');
                    console.log('   Verification usually takes 5-30 minutes after DNS records are added.');
                }
            } else {
                console.log(`❌ Domain "${DOMAIN_NAME}" not found. Creating it now...\n`);
                await createDomain();
            }
        } else {
            console.log(`❌ No domains configured. Creating "${DOMAIN_NAME}"...\n`);
            await createDomain();
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('API')) {
            console.error('\n💡 Make sure RESEND_API_KEY is set correctly in your .env file');
        }
    }
}

async function createDomain() {
    try {
        const { data: newDomain, error } = await resend.domains.create({
            name: DOMAIN_NAME,
            region: 'us-east-1' // or 'eu-west-1' for Europe
        });

        if (error) {
            console.error('❌ Failed to create domain:', error);
            return;
        }

        console.log(`✅ Domain "${DOMAIN_NAME}" created successfully!`);
        console.log(`   ID: ${newDomain.id}`);
        console.log(`   Status: ${newDomain.status}\n`);

        // Get DNS records for the newly created domain
        const { data: domainDetails } = await resend.domains.get(newDomain.id);

        if (domainDetails?.records) {
            console.log('🔑 Add these DNS records to your domain registrar:\n');
            domainDetails.records.forEach((record, index) => {
                console.log(`Record ${index + 1}:`);
                console.log(`   Type: ${record.type}`);
                console.log(`   Name: ${record.name}`);
                console.log(`   Value: ${record.value}`);
                console.log('');
            });
            console.log('⏳ After adding these records, verification will complete in 5-30 minutes.');
        }
    } catch (error) {
        console.error('❌ Error creating domain:', error.message);
    }
}

// Run the setup
setupDomain();
