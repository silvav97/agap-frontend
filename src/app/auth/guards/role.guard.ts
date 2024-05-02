import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs";
import Swal from "sweetalert2";


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router      = inject( Router );
  const requiredRoles = route.data['roles'] as Array<string>;

  return authService.getUserRoles().pipe(
    take(1),
    map(userRoles => {
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      if ( hasRequiredRole ) {
        return true;
      } else {
        let message = `Necesitas roles ${requiredRoles} para acceder a este recurso, y tu role es ${userRoles}`;
        Swal.fire('Error', 'No estás autorizado, '+ message, 'error');
        //router.navigateByUrl('/unauthorized');  // crear una pagina para unauthorized? o ese swal alert?
        return false;
      }
    }),
  );

}
