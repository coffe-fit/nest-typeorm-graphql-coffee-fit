import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RutinesTypeService } from './rutines_type.service';
import { CreateRutinesTypeInput } from './dto/create-rutines_type.input';
import { UpdateRutinesTypeInput } from './dto/update-rutines_type.input';
import { RutinesTypeType } from './rutines_type.type';

@Resolver(of => RutinesTypeType)
export class RutinesTypeResolver {
  constructor(private readonly rutinesTypeService: RutinesTypeService) {}

  @Mutation(returns => RutinesTypeType)
  rutineType_create(@Args('createRutineTypeInput') createRutinesTypeInput: CreateRutinesTypeInput) {
    return this.rutinesTypeService.createRoutineType(createRutinesTypeInput);
  }

  @Query(returns => [RutinesTypeType])
  rutineType_findAll() {
    const result = this.rutinesTypeService.getAllRoutineType()
    console.log(result);
    return result;
  }

  @Query(returns => RutinesTypeType)
  rutineType_findById(@Args('id') id: string) {
    return this.rutinesTypeService.getRoutineTypeById(id);
  }

  @Mutation(returns => RutinesTypeType)
  async rutineType_update(
    @Args('rutinesTypeId') id: string,
    @Args('updateRutinesTypeInput') updateRutinesTypeInput: UpdateRutinesTypeInput,
  ) {
    return this.rutinesTypeService.updateRoutineType(id, updateRutinesTypeInput);
  }

  @Mutation(returns => RutinesTypeType)
  async exercise_delete(@Args('rutinesTypeId') id: string): Promise<void> {
    return this.rutinesTypeService.deleteRoutineType(id);
  }
}
