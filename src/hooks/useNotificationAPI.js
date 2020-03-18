import { useState, useCallback, useEffect } from 'react';

const useNotificationAPI = () => {
  const [notificationStatus, setNotificationStatus] = useState(false);
  useEffect(() => {
    if(!('Notification' in window)) setNotificationStatus(false);
    else if(Notification.permission === "granted") {
      setNotificationStatus(true)
    }
    else if (Notification.permission !== 'denied' || Notification.permission === "default") {
     Notification.requestPermission().then(result => {
       if(result === 'granted') setNotificationStatus(true);
       else setNotificationStatus(false);
     })
   }
 }, [])

  const fireNotification = useCallback((text) => {
    if(notificationStatus) {
      const notifBody = {
        body: text,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      }
      new Notification('Pomodoro Clock', notifBody);
    } else return;

  },[notificationStatus]);

  return fireNotification;
}

export default useNotificationAPI;
