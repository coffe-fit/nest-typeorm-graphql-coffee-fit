import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { CreateProgressInput } from './dto/create-progress.input';
import { UpdateProgressInput } from './dto/update-progress.input';
import { ProgressType } from './progress.type';

@Resolver(of => ProgressType)
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  // @Mutation(returns => ProgressType)
  // progress_create(@Args('createProgressInput') createProgressInput: CreateProgressInput) {
  //   return this.progressService.createProgress(createProgressInput);
  // }

  @Query(returns => [ProgressType])
  progress_findAll() {
    return this.progressService.findAllProgress();
  }

  @Query(returns => ProgressType)
  progress_findById(@Args('progressId') id: string) {
    return this.progressService.findByIdProgress(id);
  }

  // @Mutation(returns => ProgressType)
  // progress_update(
  //   @Args('progressId') id: string,
  //   @Args('updateProgressInput') updateProgressInput: UpdateProgressInput) {
  //   return this.progressService.updateProgress(id, updateProgressInput);
  // }

  // @Mutation(returns => ProgressType)
  // progress_delete(@Args('progressId') id: string) {
  //   return this.progressService.removeProgress(id);
  // }
}
