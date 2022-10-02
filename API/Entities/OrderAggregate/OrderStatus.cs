using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    //สถานะการช าระเงิน
    public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymentFailed
    }
}
