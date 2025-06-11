import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SETTINGS } from '../../../../common/controller.path.settings';

@ApiTags('Users')
@Controller(SETTINGS.PATH.USER)
export class UserController {}
