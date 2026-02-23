import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.tutorProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@skillbridge.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true
    }
  });
  console.log('👤 Admin created:', admin.email);

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Mathematics', description: 'Algebra, Calculus, Statistics', icon: '📐' },
      { name: 'Physics', description: 'Mechanics, Electricity, Quantum', icon: '⚛️' },
      { name: 'Chemistry', description: 'Organic, Inorganic, Physical', icon: '🧪' },
      { name: 'Biology', description: 'Cell Biology, Genetics, Ecology', icon: '🧬' },
      { name: 'English', description: 'Literature, Grammar, Writing', icon: '📚' },
      { name: 'History', description: 'World History, Geography', icon: '🏛️' },
      { name: 'Computer Science', description: 'Programming, Web Development', icon: '💻' },
      { name: 'Languages', description: 'Spanish, French, German', icon: '🗣️' }
    ]
  });
  console.log(`📚 Created ${categories.count} categories`);

  const tutorPassword = await bcrypt.hash('password123', 10);
  
  const tutors = [
    {
      email: 'john.doe@example.com',
      name: 'Dr. John Smith',
      title: 'PhD in Mathematics',
      bio: 'Experienced math tutor with 10+ years of teaching.',
      hourlyRate: 50,
      phone: '+1234567890',
      education: 'PhD in Mathematics, MIT',
      experience: 10,
      subjects: ['Mathematics', 'Physics']
    },
    {
      email: 'jane.wilson@example.com',
      name: 'Prof. Jane Wilson',
      title: 'Computer Science Expert',
      bio: 'Senior software engineer turned educator.',
      hourlyRate: 60,
      phone: '+1234567891',
      education: 'MS in Computer Science, Stanford',
      experience: 8,
      subjects: ['Computer Science', 'Mathematics']
    }
  ];

  for (const tutorData of tutors) {
    const user = await prisma.user.create({
      data: {
        email: tutorData.email,
        password: tutorPassword,
        name: tutorData.name,
        role: 'TUTOR',
        isActive: true,
        tutorProfile: {
          create: {
            title: tutorData.title,
            bio: tutorData.bio,
            hourlyRate: tutorData.hourlyRate,
            phone: tutorData.phone,
            education: tutorData.education,
            experience: tutorData.experience,
            subjects: tutorData.subjects,
            availability: {
              create: [
                { dayOfWeek: 1, startTime: '09:00', endTime: '12:00' },
                { dayOfWeek: 3, startTime: '09:00', endTime: '12:00' },
                { dayOfWeek: 5, startTime: '09:00', endTime: '12:00' }
              ]
            }
          }
        }
      }
    });
    console.log(`👨‍🏫 Created tutor: ${user.name}`);
  }

  const studentPassword = await bcrypt.hash('password123', 10);
  const student = await prisma.user.create({
    data: {
      email: 'alice.johnson@example.com',
      password: studentPassword,
      name: 'Alice Johnson',
      role: 'STUDENT',
      isActive: true,
      studentProfile: {
        create: {
          phone: '+1234567893',
          bio: 'High school student preparing for college',
          subjects: ['Mathematics', 'Physics']
        }
      }
    }
  });
  console.log('👩‍🎓 Created student:', student.name);

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
