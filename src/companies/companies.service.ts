// company.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getDataById, updateCode } from 'src/utils';
import { UpdateCompanyInput } from './dto/update-company.input';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async createCompany(companyData: Partial<Company>): Promise<Company> {
    let {active} = companyData;
    active =  true;
    const newCompany = this.companyRepository.create({ active, ...companyData});
    return this.companyRepository.save(newCompany);
  }

  async findAllCompany(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findByIdCompany(companyId: string): Promise<Company> {
    const company = await getDataById(companyId,this.companyRepository);
    return company;
  }


  async updateCompany(companyId: string, updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    let { ...toUpdate } = updateCompanyInput;
    const company = await updateCode(
      companyId,
      toUpdate,
      this.companyRepository
    );
    return this.companyRepository.save(company);
  }

  async removeCompany(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
