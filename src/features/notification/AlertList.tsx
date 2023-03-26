import { Alert } from "./Alert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectNotifications } from "./notificationsSlice";
export function AlertList() {
  const alerts = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch()
  // const alerts = [
  //     {
  //         message: 'Pierwszy alert', type: 'success'
  //     },
  //             {
  //         message: 'Drugi alert', type: 'info'
  //     },
  //             {
  //         message: 'Trzeci alert', type: 'warning'
  //     },
  //             {
  //         message: 'Czwarty alert', type: 'error'
  //     },
  // ]

  return (
    <div>
      { alerts.map(alert => (
        <Alert key={alert.id} id={alert.id} message={alert.message} type={alert.type} />
      ))}
 
    </div>
  
    
  );
}
