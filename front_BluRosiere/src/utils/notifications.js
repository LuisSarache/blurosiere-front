/**
 * Sistema de Notificações
 * Gerencia lembretes e notificações de consultas
 */

export const notificationService = {
  /**
   * Verifica consultas próximas (24h)
   */
  checkUpcomingAppointments(appointments) {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return appointments.filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.time}`);
      return aptDate > now && aptDate <= tomorrow && apt.status === 'agendado';
    });
  },

  /**
   * Formata mensagem de lembrete
   */
  formatReminder(appointment) {
    const date = new Date(`${appointment.date}T${appointment.time}`);
    const hours = Math.floor((date - new Date()) / (1000 * 60 * 60));
    
    return {
      title: 'Lembrete de Consulta',
      message: `Você tem uma consulta em ${hours}h - ${appointment.description}`,
      time: appointment.time,
      date: appointment.date
    };
  },

  /**
   * Solicita permissão para notificações
   */
  async requestPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      return await Notification.requestPermission();
    }
    return Notification.permission;
  },

  /**
   * Envia notificação do navegador
   */
  sendBrowserNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo.png',
        badge: '/logo.png'
      });
    }
  }
};
