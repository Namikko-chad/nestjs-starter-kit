import { CustomDecorator, SetMetadata, } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export function AuthPublic(): CustomDecorator<string> {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

export const IS_TRY = 'isTry';

export function AuthTry(): CustomDecorator<string> {
  return SetMetadata(IS_TRY, true);
}
