import { User } from "./../client";
import { Post } from "./../client";
import { Review } from "./../client";
import { Prisma } from "./../client";
import type { PrismaClient } from "./../client";
import { getClient } from "@quramy/prisma-fabbrica/lib/clientHolder";
import scalarFieldValueGenerator from "@quramy/prisma-fabbrica/lib/scalar/gen";
import { Resolver, resolveValue } from "@quramy/prisma-fabbrica/lib/helpers";
export { initialize } from "@quramy/prisma-fabbrica";
type UserScalarOrEnumFields = {
    id: string;
    name: string;
};
type UserFactoryDefineInput = {
    id?: string;
    name?: string;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutReviewerInput;
};
type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput>;
};
function autoGenerateUserScalarsOrEnums(): UserScalarOrEnumFields {
    return {
        id: scalarFieldValueGenerator.String({ modelName: "User", fieldName: "id", isId: true, isUnique: false }),
        name: scalarFieldValueGenerator.String({ modelName: "User", fieldName: "name", isId: false, isUnique: false })
    };
}
function defineUserFactoryInternal({ defaultData: defaultDataResolver }: UserFactoryDefineOptions) {
    const buildCreateInput = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
        const requiredScalarData = autoGenerateUserScalarsOrEnums();
        const defaultData = await resolveValue(defaultDataResolver ?? {});
        const defaultAssociations = {};
        const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const pickForConnect = (inputData: User) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
        const data = await buildCreateInput(inputData);
        return await getClient<PrismaClient>().user.create({ data });
    };
    const createForConnect = (inputData: Partial<Prisma.UserCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "User" as const,
        buildCreateInput,
        pickForConnect,
        create,
        createForConnect,
    };
}
export function defineUserFactory(args: UserFactoryDefineOptions = {}) {
    return defineUserFactoryInternal(args);
}
type PostScalarOrEnumFields = {
    id: string;
    title: string;
};
type PostFactoryDefineInput = {
    id?: string;
    title?: string;
    author?: Prisma.UserCreateNestedOneWithoutPostsInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutPostInput;
};
type PostFactoryDefineOptions = {
    defaultData?: Resolver<PostFactoryDefineInput>;
};
function autoGeneratePostScalarsOrEnums(): PostScalarOrEnumFields {
    return {
        id: scalarFieldValueGenerator.String({ modelName: "Post", fieldName: "id", isId: true, isUnique: false }),
        title: scalarFieldValueGenerator.String({ modelName: "Post", fieldName: "title", isId: false, isUnique: false })
    };
}
function definePostFactoryInternal({ defaultData: defaultDataResolver }: PostFactoryDefineOptions) {
    const buildCreateInput = async (inputData: Partial<Prisma.PostCreateInput> = {}) => {
        const requiredScalarData = autoGeneratePostScalarsOrEnums();
        const defaultData = await resolveValue(defaultDataResolver ?? {});
        const defaultAssociations = {};
        const data: Prisma.PostCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const pickForConnect = (inputData: Post) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.PostCreateInput> = {}) => {
        const data = await buildCreateInput(inputData);
        return await getClient<PrismaClient>().post.create({ data });
    };
    const createForConnect = (inputData: Partial<Prisma.PostCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Post" as const,
        buildCreateInput,
        pickForConnect,
        create,
        createForConnect,
    };
}
export function definePostFactory(args: PostFactoryDefineOptions = {}) {
    return definePostFactoryInternal(args);
}
type ReviewScalarOrEnumFields = {
    id: string;
    body: string;
};
type ReviewpostFactory = {
    _factoryFor: "Post";
    buildCreateInput: () => PromiseLike<Prisma.PostCreateNestedOneWithoutReviewsInput["create"]>;
};
type ReviewreviewerFactory = {
    _factoryFor: "User";
    buildCreateInput: () => PromiseLike<Prisma.UserCreateNestedOneWithoutReviewsInput["create"]>;
};
type ReviewFactoryDefineInput = {
    id?: string;
    body?: string;
    post: ReviewpostFactory | Prisma.PostCreateNestedOneWithoutReviewsInput;
    reviewer: ReviewreviewerFactory | Prisma.UserCreateNestedOneWithoutReviewsInput;
};
type ReviewFactoryDefineOptions = {
    defaultData: Resolver<ReviewFactoryDefineInput>;
};
function isReviewpostFactory(x: ReviewpostFactory | Prisma.PostCreateNestedOneWithoutReviewsInput): x is ReviewpostFactory {
    return (x as any)._factoryFor === "Post";
}
function isReviewreviewerFactory(x: ReviewreviewerFactory | Prisma.UserCreateNestedOneWithoutReviewsInput): x is ReviewreviewerFactory {
    return (x as any)._factoryFor === "User";
}
function autoGenerateReviewScalarsOrEnums(): ReviewScalarOrEnumFields {
    return {
        id: scalarFieldValueGenerator.String({ modelName: "Review", fieldName: "id", isId: true, isUnique: false }),
        body: scalarFieldValueGenerator.String({ modelName: "Review", fieldName: "body", isId: false, isUnique: false })
    };
}
function defineReviewFactoryInternal({ defaultData: defaultDataResolver }: ReviewFactoryDefineOptions) {
    const buildCreateInput = async (inputData: Partial<Prisma.ReviewCreateInput> = {}) => {
        const requiredScalarData = autoGenerateReviewScalarsOrEnums();
        const defaultData = await resolveValue(defaultDataResolver ?? {});
        const defaultAssociations = {
            post: isReviewpostFactory(defaultData.post) ? {
                create: await defaultData.post.buildCreateInput()
            } : defaultData.post,
            reviewer: isReviewreviewerFactory(defaultData.reviewer) ? {
                create: await defaultData.reviewer.buildCreateInput()
            } : defaultData.reviewer
        };
        const data: Prisma.ReviewCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const pickForConnect = (inputData: Review) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.ReviewCreateInput> = {}) => {
        const data = await buildCreateInput(inputData);
        return await getClient<PrismaClient>().review.create({ data });
    };
    const createForConnect = (inputData: Partial<Prisma.ReviewCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Review" as const,
        buildCreateInput,
        pickForConnect,
        create,
        createForConnect,
    };
}
export function defineReviewFactory(args: ReviewFactoryDefineOptions) {
    return defineReviewFactoryInternal(args);
}