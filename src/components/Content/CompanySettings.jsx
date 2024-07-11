import { Box, Image, Text, Grid, Badge, useDisclosure, IconButton, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaTrash, FaEdit } from 'react-icons/fa'

const MotionBox = motion(Box)

const PropertyCard = ({ property }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      position="relative"
      height="300px"
    >
      <Image src={property.image} alt={property.address} height="100%" width="100%" objectFit="cover" />
      <Box 
        position="absolute" 
        top="0"
        left="0" 
        right="0" 
        p="4"
        color="white"
      >
        <Badge borderRadius="full" px="2" colorScheme="blue" mb="2" fontSize="md">
          ${property.price.toLocaleString()}
        </Badge>
        <Text fontWeight="bold" fontSize="xl" lineHeight="short" mb="1" textShadow="1px 1px 2px rgba(0,0,0,0.6)">
          {property.address}
        </Text>
        <Text fontSize="md" mb="2" textShadow="1px 1px 2px rgba(0,0,0,0.6)">
          {property.city}, {property.state} {property.zipCode}
        </Text>
      </Box>
      <MotionBox
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(255, 255, 255, 0.7)"
        p="4"
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={3} fontSize="md" mb="3">
          <Text><strong>Area:</strong> {property.details.area}m²</Text>
          <Text><strong>Beds:</strong> {property.details.beds}</Text>
          <Text><strong>Baths:</strong> {property.details.baths}</Text>
          <Text><strong>Garages:</strong> {property.details.garages}</Text>
        </Grid>
        <HStack justifyContent="flex-end">
          <IconButton
            icon={<FaEdit />}
            aria-label="Edit property"
            size="sm"
            colorScheme="blue"
          />
          <IconButton
            icon={<FaTrash />}
            aria-label="Delete property"
            size="sm"
            colorScheme="red"
          />
        </HStack>
      </MotionBox>
    </MotionBox>
  )
}

function PropertyList() {
  const properties = [
    {
      image: "public/009870x420jpg@2x.png",
      price: 11000,
      address: "3398 Lodgeville Road",
      city: "Golden Valley",
      state: "MN",
      zipCode: "55427",
      details: {
        area: 240,
        beds: 2,
        baths: 2,
        garages: 0
      }
    },
    {
      image: "public/009870x420jpg@2x.png",
      price: 21000,
      address: "3398 Lodgeville Road",
      city: "Golden Valley",
      state: "MN",
      zipCode: "55427",
      details: {
        area: 240,
        beds: 2,
        baths: 2,
        garages: 0
      }
    },
  ]

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={6}
    >
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </Box>
  )
}

export default PropertyList