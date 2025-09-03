import { test, expect } from "vitest";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeUser } from "../tests/factories/make-user.ts";
import { makeEnrollment } from "../tests/factories/make-enrollment.ts";

test("get courses", async () => {
  await server.ready();

  const title = randomUUID();

  const course = await makeCourse(title);
  const user = await makeUser();
  const enrollment = await makeEnrollment(course.id, user.id);

  const response = await request(server.server).get(`/courses?search=${title}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: title,
        enrollments: 1,
      },
    ],
  });
});
