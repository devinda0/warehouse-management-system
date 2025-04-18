from sqlalchemy import event
from app.models import Item, Warehouse


@event.listens_for(Item, "after_insert")
def after_insert_item(mapper, connection, target):
    """
    This function is called after an Item object is inserted into the database.
    It will calculate the total space occupied by the item in the warehouse.
    """
    items = connection.query(Item).all()

    total_space = 0

    # Calculate the total space occupied by all items
    for item in items:
        total_space += item.space * item.quantity

    # Update the total space in the warehouse
    warehouse = connection.query(Warehouse).first()
    warehouse.current_capacity = total_space
    connection.commit()
    connection.refresh(warehouse)

@event.listens_for(Item, "after_delete")
def after_delete_item(mapper, connection, target):
    """
    This function is called after an Item object is deleted from the database.
    It will calculate the total space occupied by the item in the warehouse.
    """
    items = connection.query(Item).all()

    total_space = 0

    # Calculate the total space occupied by all items
    for item in items:
        total_space += item.space * item.quantity

    # Update the total space in the warehouse
    warehouse = connection.query(Warehouse).first()
    warehouse.current_capacity = total_space
    connection.commit()
    connection.refresh(warehouse)


@event.listens_for(Item, "after_update")
def after_update_item(mapper, connection, target):
    """
    This function is called after an Item object is updated in the database.
    It will calculate the total space occupied by the item in the warehouse.
    """
    items = connection.query(Item).all()

    total_space = 0

    # Calculate the total space occupied by all items
    for item in items:
        total_space += item.space * item.quantity

    # Update the total space in the warehouse
    warehouse = connection.query(Warehouse).first()
    warehouse.current_capacity = total_space
    connection.commit()
    connection.refresh(warehouse)