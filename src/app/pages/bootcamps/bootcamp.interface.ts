export interface Bootcamp {
  user?: User;
  name?: String;
  description?: String;
  wibesite?: String;
  phone?: String;
  email?: String;
  address?: Address;
  coordinates?: Number;
  careers?: String;
  averageRating?: Number;
  averageCost?: Number;
  housing?: Boolean;
  jobAssistance?: Boolean;
  jobGuarantee?: Boolean;
  acceptGi?: Boolean;
  createdAt?: Date;
}

interface Address {
  formattedAddress: String;
  street: String;
  city: String;
  state: String;
  zipcode: String;
  country: String;
}


interface User {
  name?: String;
  password?: String;
}