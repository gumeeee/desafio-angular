import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../service/user-auth';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const _userAuthService = inject(UserAuthService);

  const hasToken = _userAuthService.getUserToken();
  if (hasToken) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${hasToken}`),
    });

    return next(newReq);
  }

  return next(req);
};
