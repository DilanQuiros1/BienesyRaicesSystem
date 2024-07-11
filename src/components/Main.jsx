import { Container } from '@chakra-ui/layout'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import Cover from '../components/Cover' // Asegúrate de usar la ruta correcta

export default function Main() {
  return (
    <>
      <Cover />
      <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
        <Sidebar />
        <Content />
      </Container>
    </>
  )
}