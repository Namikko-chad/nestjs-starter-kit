export enum MessageStatus {
  New = 'new',
  Delivered = 'delivered',
  Read = 'read',
  Deleted = 'deleted',
}

export enum Event {
  RoomCreated = 'room-created',
  RoomUpdated = 'room-updated',
  RoomDeleted = 'room-deleted',
  MessageCreated = 'message-created',
  MessageDelivered = 'message-delivered',
  MessageRead = 'message-read',
  MessageEdited = 'message-edited',
  UserAdded = 'user-added',
  UserDeleted = 'user-deleted',
}