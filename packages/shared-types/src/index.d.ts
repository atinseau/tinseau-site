
declare global {
  type With<T, U> = T & U

  type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>

  interface FileMeta {
    identifier?: string
    bucket?: "tinseau-image" | "tinseau-decharge"
    drive: "s3" | "local" | "external"
    type: "image" | "pdf" | "video" | "audio"
  }

  type OrderType =
    "location" |
    "ttd"

  type OrderOptionType =
    "track_access" |
    "location" |
    "global"

  type TTDOptionType =
    "bool" |
    "number"

  type SerieFormat =
    "s3 t4" |
    "s6 t7" |
    "s4 t2"

  type DechargeType =
    "track_access" |
    "location" |
    "additionnal_driver"

  type DechargeableItem = {
    name: string
    required_amount: any
    type: DechargeType
  }

  type TTDImage = {
    id: string
    title: string
    description: string
    url: string
    metadata: FileMeta
  }

  type TTDOption = {
    name: string
    price: number
    dechargeable?: DechargeType
    settings: {
      type: TTDOptionType
      value: any
    }
  }

  type TTDTrackAccess = {
    id: string
    places: number
    price: number
    options: TTDOption[]
    event_id: string
  }

  type TTDCar = {
    id: string
    name: string
    description: string
    images: TTDImage[]
  }

  type TTDLocation = {
    id: string
    instances_amount: number
    max_instances: number
    exclusive_price: number
    instance_price: number
    serie_format: SerieFormat
    options: TTDOption[]
    event_id: string
    car_id: string

    car: TTDCar
  }

  type TTDLocationItem = {
    car_id: string
    instance_amount: number
  }

  type TTDEvent = {
    id: string
    title: string
    date: Date
    description: string
    options: TTDOption[]
    circuit_id: string
    track_access: TTDTrackAccess
    locations: TTDLocation[]
  }

  type TTDCircuit = {
    id: string
    name: string
    description: string
    events: TTDEvent[]
    // options: TTDOption[]
    logo: TTDImage
  }



  type LoginData = {
    email: string
    password: string
    username?: string
  }

  type User = {
    id: string
    email: string
    created_at: Date
    updated_at: Date
    profil?: TTDImage
  }

  interface SortMode {
    label: string
    value: string
  }


  type OrderOption = {
    name: string
    value: any
    type: TTDOptionType
  }

  type WithOrderOptions<T> = With<T, { options: OrderOption[] }>

  type ClassicOrderItem = { count: number }

  type OrderSubItem = {
    type: OrderType
    locations?: WithOrderOptions<TTDLocationItem>[]
    track_access?: WithOrderOptions<ClassicOrderItem>
    options: OrderOption[]
  }

  type OrderItem = {
    circuit: Omit<TTDCircuit, 'events'>
    event: TTDEvent
    order: OrderSubItem
  }



  type CartPayload = {
    ttd: OrderItem[]
  }

  type Tracker = {
    id: string
    type: "location" | "track_access"
    hold: number
  }

  type StockSession = {
    remainingTime: string
    trackers: Tracker[]
    items: OrderItem[]
  }



  type DechargeBuilder = {
    type: DechargeType
    skeleton: boolean
    data?: any
    signature?: Buffer
  }

  type TTDDecharge<T = any> = {
    created_at: string
    data: T
    file_id: string
    expiration: string
    id: string
    type: DechargeType
    updated_at: string
    user_id: string
  }


  type UserCar = {
    id: string
    brand: string
    images: TTDImage[]
    model: string
    registration: string
    allow_image_sharing: boolean
    assurance_name: string
    assurance_number: string
    user_id: string
    created_at: string
    updated_at: string
  }


  // Decharge

  type EventsPayload = {
    [id: string]: {
      selectedDechargeableItem: number
      meta: {
        additionnal_driver_agreement?: boolean
      }
    }
  }
}

export { }