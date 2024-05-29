import { Resolver, Query, Mutation, Args, GqlExecutionContext, Context } from '@nestjs/graphql';
import { RutineService } from './rutines.service';
import { CreateRutineInput } from './dto/create-rutine.input';
import { UpdateRutineInput } from './dto/update-rutine.input';
import { Rutine } from './entities/rutine.entity';
import { RutineType } from './types/rutine.type';
import { RutineOrderRutineType } from './types/rutineOrderRutine.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RutineOrderDaysType } from './types/rutineOrderDays.type';
import { CreateRutineWithExercisesInput } from './dto/create-rutine-exercises';
import { NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';


@Resolver(of =>  RutineType)
export class RutinesResolver {
  constructor(private readonly RutineService: RutineService) {}

  @Mutation(returns => RutineType)
  async rutine_create(@Args('createRutineInput') createRutineInput: CreateRutineInput): Promise<Rutine> {
    console.log(createRutineInput);
    
    return this.RutineService.createRutine(createRutineInput);
  }

  @Mutation(returns => RutineType)
  @UseGuards(JwtAuthGuard)
  // @UseGuards(FirebaseAuthGuard)
  async rutine_create_with_exercises(@Args('createRutineWithExercisesInput') createRutineWithExercisesInput: CreateRutineWithExercisesInput): Promise<Rutine> {
    console.log(createRutineWithExercisesInput);
    
    return this.RutineService.createRutineWithExercises(createRutineWithExercisesInput);
  }

  @Query(returns => [RutineType])
  async rutine_findAll(): Promise<Rutine[]> {
    return this.RutineService.getAllRutines();
  }

  @Query(returns => RutineType)
  async rutine_findById(@Args('rutineId') id: string): Promise<Rutine> {
    return this.RutineService.getRutineById(id);
  }
  
  @Query(returns => [RutineOrderRutineType])
  @UseGuards(JwtAuthGuard)
  async rutine_getActualRutineOrderRutineType(@Context() context){
    const userId = context.user.id;
    if (!userId) {
      console.log('the Id in rutine_getActualRutineOrderRutineType missin ');
    }
    return await this.RutineService.getActualRutineOrderRutineType(userId);
  }

  @Query(returns => [RutineOrderDaysType])
  @UseGuards(JwtAuthGuard)
  async rutine_getActualRutineOrderDays(@Context() context){
    const userId = context.user.id;
    // const userId = "12ea4613-139f-46b2-8be1-4164f3a1634b";
    console.log(userId);
    
    return await this.RutineService.getActualRutineOrderDays(userId);
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
