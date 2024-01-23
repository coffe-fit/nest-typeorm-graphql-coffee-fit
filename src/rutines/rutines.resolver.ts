import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RutineService } from './rutines.service';
import { CreateRutineInput } from './dto/create-rutine.input';
import { UpdateRutineInput } from './dto/update-rutine.input';
import { Rutine } from './entities/rutine.entity';
import { RutineType } from './rutine.type';

@Resolver(of =>  RutineType)
export class RutinesResolver {
  constructor(private readonly RutineService: RutineService) {}

  @Mutation(returns => RutineType)
  async rutine_create(@Args('createRutineInput') createRutineInput: CreateRutineInput): Promise<Rutine> {
    console.log(createRutineInput);
    
    return this.RutineService.createRutine(createRutineInput);
  }

  @Query(returns => [RutineType])
  async rutine_findAll(): Promise<Rutine[]> {
    return this.RutineService.getAllRutines();
  }

  @Query(returns => RutineType)
  async rutine_findById(@Args('rutineId') id: string): Promise<Rutine> {
    return this.RutineService.getRutineById(id);
  }


  @Mutation(returns => RutineType)
  async rutine_update(
    @Args('rutineId') id: string,
    @Args('updateRutineInput') updateRutineInput: UpdateRutineInput,
  ): Promise<Rutine> {
    return this.RutineService.updateRutine(id, updateRutineInput);
  }

  @Mutation(returns => RutineType)
  async rutine_delete(@Args('rutineId') id: string): Promise<void> {
    return this.RutineService.deleteRutine(id);
  }
}
