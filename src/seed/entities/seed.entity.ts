import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Seed {
  @Field(() => String, { description: 'Example field (placeholder)' })
  seed: string;
}
