import { defineUserFactory, definePostFactory } from "./__generated__/fabbrica";

const UserFactory = defineUserFactory();

const PostFactory = definePostFactory({
  defaultData: {
    author: UserFactory,
  },
});

const prisma = jestPrisma.client;

describe("factories", () => {
  describe("UserFactory", () => {
    it("creates records without input parameters", async () => {
      await UserFactory.create();
      await UserFactory.create();
      await expect(prisma.user.count()).resolves.toBe(2);
    });

    it("creates record with input parameters", async () => {
      await UserFactory.create({ id: "user001", name: "Quramy" });
      const user = await prisma.user.findUnique({ where: { id: "user001" } });
      expect(user).toEqual({ id: "user001", name: "Quramy" });
    });
  });

  describe("PostFactory", () => {
    it("creates required association", async () => {
      await PostFactory.create();
      const created = await prisma.post.findFirst({ include: { author: true } });
      expect(created?.id).not.toBeFalsy();
      expect(created?.author.id).not.toBeFalsy();
    });
  });
});
