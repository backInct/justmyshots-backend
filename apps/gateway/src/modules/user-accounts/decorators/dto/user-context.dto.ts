import { UserId } from '../../user/domain/dto/user.dto';

export class UserContextDTO {
  userId: UserId;
}

export class UserOptionalContextDTO {
  userId: UserId | null;
}
