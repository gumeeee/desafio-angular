import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../service/user';
import { UserAuthService } from '../service/user-auth';

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userAuthService = inject(UserAuthService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  const hasToken = _userAuthService.getUserToken();

  if (!hasToken) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    return _router.navigate(['/products']);
  } catch (error) {
    return true;
  }
};
