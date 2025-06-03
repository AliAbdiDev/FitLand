import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateUsersWithShortId() {
    try {
        const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });
        if (users.length === 0) {
            console.log('هیچ کاربری در پایگاه داده یافت نشد');
            return;
        }

        let nextId = 1; // شروع از 1
        for (const user of users) {
            if (user.shortId === null || user.shortId === undefined) {
                // پیدا کردن کوچک‌ترین shortId استفاده‌نشده
                while (await prisma.user.findUnique({ where: { shortId: nextId } })) {
                    nextId++;
                }

                await prisma.user.update({
                    where: { id: user.id },
                    data: { shortId: nextId },
                });
                console.log(`کاربر ${user.email} با shortId: ${nextId} به‌روزرسانی شد`);
                nextId++; // افزایش برای کاربر بعدی
            }
        }
        console.log('همه shortIdها با موفقیت به‌روزرسانی شدند');
    } catch (error) {
        console.error('خطا در به‌روزرسانی shortIdها:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateUsersWithShortId();