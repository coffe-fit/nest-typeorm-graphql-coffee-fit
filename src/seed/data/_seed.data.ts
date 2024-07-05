import { ExerciseType } from 'src/exercises/exercise.type';
import { roleType } from 'src/roles/role.type';
import { RutinesTypeType } from 'src/rutines_type/rutines_type.type';
import { UsersType } from 'src/users/types/users.type';
import { v4 as uuid } from 'uuid';
import { exercise1, exercise20, exercise52 } from './exercises.data';
import { rolesData } from './roles.data';
import { exercisesMetricsData } from './exercisesMetrics.data';
import { usersData } from './users.data';
import { rutineTypeData } from './rutineType.data';
import { companiesData } from './companies.data';


interface SeedData {
  roles: roleType[];
  users: any[];
  rutineType: RutinesTypeType[],
  exercises: any[];
  companies: any[];
  exercisesMetrics: any[]
}
export const initialData: SeedData = {
  roles: rolesData,
  users: usersData,
  rutineType: rutineTypeData,
  exercises: exercise20,
  companies: companiesData,
  exercisesMetrics: exercisesMetricsData
  // companies: []
}