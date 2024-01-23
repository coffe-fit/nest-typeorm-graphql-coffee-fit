import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { RutinesDetailService } from './rutines_detail.service';
import { CreateRutinesDetailInput } from './dto/create-rutines_detail.input';
import { UpdateRutinesDetailInput } from './dto/update-rutines_detail.input';
import { RutineDetail } from './entities/rutines_detail.entity';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { RutinesDetailType } from './rutines_detail.type';

@Resolver(of => RutinesDetailType)
export class RutinesDetailResolver {
  constructor(private readonly RutineDetailService: RutinesDetailService) {}

  
  @Query(returns => [RutinesDetailType])
  async rutineDetail_findAll(): Promise<RutineDetail[]> {
    return this.RutineDetailService.getAllRutineDetail();
  }

  @Mutation(returns => RutinesDetailType)
  async rutineDetail_create(
    @Args('CreateRutinesDetailInput') CreateRutinesDetailInput: CreateRutinesDetailInput,
  ): Promise<RutineDetail> {
    return this.RutineDetailService.createRutineDetail(
      CreateRutinesDetailInput
    );
  }
  
  @Mutation(returns => RutinesDetailType)
  async rutineDetail_update(
    @Args('rutineDetailId') id: string,
    @Args('updateRutinesDetailInput') updateRutinesDetailInput: UpdateRutinesDetailInput,
  ) {
    return this.RutineDetailService.updateRutineDetail(id, updateRutinesDetailInput);
  }

  @Mutation(returns => RutinesDetailType)
  async rutineDetail_delete(@Args('rutineDetailId') id: string): Promise<void> {
    return this.RutineDetailService.deleteRutineDetail(id);
  }

  @ResolveField(returns => RutinesDetailType)
  async RutineDetailroutine(@Parent() RutineDetail: RutineDetail): Promise<Rutine> {
    return RutineDetail.rutine;
  }
}
