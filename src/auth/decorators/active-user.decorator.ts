import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const ActiveUser = createParamDecorator((data: unknown, context:ExecutionContext)=>{

  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;
  return req.user
})