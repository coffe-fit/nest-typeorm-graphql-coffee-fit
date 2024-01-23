import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { CompanyType } from './company.type';

@Resolver(of => CompanyType)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation(returns  => CompanyType)
  company_create(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companiesService.createCompany(createCompanyInput);
  }

  @Query(returns  => [CompanyType])
  company_findAll() {
    return this.companiesService.findAllCompany();
  }

  @Query(returns  => CompanyType)
  company_findById(@Args('companyId') id: string) {
    return this.companiesService.findByIdCompany(id);
  }

  @Mutation(returns  => CompanyType)
  async company_update(
    @Args('companyId') id: string,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
    return this.companiesService.updateCompany(id, updateCompanyInput);
  }

  @Mutation(returns  => CompanyType)
  company_delete(@Args('companyId') id: string) {
    return this.companiesService.removeCompany(id);
  }
}
