import { db } from "../../database/client.ts";
import { enrollments } from "../../database/schema.ts";

export async function makeEnrollment(courseId: string, userId: string) {
  const result = await db
    .insert(enrollments)
    .values({
      courseId,
      userId,
    })
    .returning();

  return result[0];
}
