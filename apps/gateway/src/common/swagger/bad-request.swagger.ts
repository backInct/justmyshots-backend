import { ApiResponse } from '@nestjs/swagger';
import { BadRequestErrorsOutputDto } from '../dto/bad-request-errors.output-dto';
import { HttpStatus } from '@nestjs/common';

export const ApiBadRequestCustomResponse = () =>
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorsOutputDto,
    description: 'Некорректные данные',
  });

export const ApiUnauthorizedCustomResponse = () =>
  ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Не авторизован',
  });

export const ApiNotFoundCustomResponse = () =>
  ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Сущность с указанной id не найдена',
  });

export const ApiForbiddenCustomResponse = () =>
  ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Нельзя изменить сущность, которая не принадлежит пользователю',
  });
