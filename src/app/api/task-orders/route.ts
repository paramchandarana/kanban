import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../../../prisma/src/db"

export async function PUT(req: any, res: NextResponse) {
    try {
        const existingTaskOrder = await db.taskOrder.findFirst({
            where: {
                project_id: req.body.project_id,
                category: req.body.category
            }
        });

        if (!existingTaskOrder) {
            return NextResponse.json({ message: 'TaskOrder not found' }, { status: 404 });
        }

        // Check if the new taskIds already exist in another TaskOrder
        const taskOrderWithSameTaskIds = await db.taskOrder.findFirst({
            where: {
                taskIds: req.body.taskIds,
                NOT: {
                    project_id: existingTaskOrder.project_id,
                    category: existingTaskOrder.category
                }
            }
        });

        if (taskOrderWithSameTaskIds) {
            return NextResponse.json({ message: 'taskIds must be unique across TaskOrders' }, { status: 400 });
        }

        const updatedTaskOrder = await db.taskOrder.update({
            where: {
                project_id: req.body.project_id,
                category: req.body.category
            },
            data: {
                taskIds: req.body.taskIds
            },
        });

        return NextResponse.json(updatedTaskOrder);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
