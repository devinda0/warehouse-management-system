from .auth import (
    handle_register_supplier,
    handle_login,
    handle_get_profile
)
from .quotation import (
    handle_get_quotations,
    handle_get_quotation_by_id,
    handle_create_quotation,
    handle_update_quotation,
    handle_delete_quotation,
    handle_get_quotation_by_request_id
)
from .request import (
    handle_get_requests,
    handle_get_request_by_id,
    handle_create_request,
    handle_update_request,
    handle_delete_request
)