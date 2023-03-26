// Utwórz nowy kawałek stanu ( slice ) dla Notyfikacji
// Zdefiniuj model Notyfikacji
// Stan powinien przechowywać listę Notyfikacji
// Dodaj akcję dodawania Notyfikacji
// Dodaj akcję usuwania Notyfikacji
// Utwórz selektor który zwróci listę notyfikacji
// Wyświetl powiadomienia z stanu w AlertsList
// Po dodaniu do produktu do koszyka powininno pojawiać się powiadomienie Dodano do koszyka ( success )
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../app/store"


export interface Notification {
    message: string,
    type: string;
    id: string;
}
export interface NotificationsState {
    items: Notification[];
}
const initialState: NotificationsState = {
    items: [{ id: '1', type: "success", message: 'Pierwszy alert'}],
}
 export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<{
            type: string,
            message: string}>
        ) { const id = new Date().getTime().toString()
            const { type, message} = action.payload;
            const notification: Notification = {
                // id: id,
                // type: action.payload.type,
                // message: action.payload.message
                //albo
                // id,
                // type,
                // message
                ...action.payload,
                id,
            };


// if (state.items.length ==== 3) {
//     state.items.shift();
// }




            state.items.push(notification)
            // state.items = [...state.items, notification]
        },
            removeNotification(state, action: PayloadAction<{id: string}>) {
                const {id} = action.payload;
                state.items = state.items.filter(item => item.id !== id)
            }
        },
    }
 )
export const notificationsReducer = notificationsSlice.reducer

 export const { addNotification, removeNotification } = notificationsSlice.actions;

 export const selectNotifications = (state: RootState) =>  
    state.notifications.items;
 
export const selectLast3Notifications = (state: RootState) => {
return state.notifications.items.slice(-3)
}