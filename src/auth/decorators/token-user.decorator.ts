import { createParamDecorator, ExecutionContext } from "@nestjs/common";


//creating decorator//
//decor consist of data and incoming req
export const TokenUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})