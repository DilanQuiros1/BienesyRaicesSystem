import { FormControl, FormLabel, Switch } from '@chakra-ui/react'

function Notifications() {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="notificationEmails"
        mb={0}
        cursor="pointer"
        userSelect="none"
      >
        Recibir correos electrónicos de notificación
      </FormLabel>
      <Switch id="notificationEmails" />
    </FormControl>
  )
}

export default Notifications
