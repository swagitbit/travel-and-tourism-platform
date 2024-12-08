/*using Stripe;
using Stripe.Checkout;
using Journey.Dtos;

namespace Journey.Services
{
    public class StripePaymentService : IPaymentService
    {
        private readonly string _secretKey;

        public StripePaymentService(IConfiguration configuration)
        {
            _secretKey = configuration["Stripe:SecretKey"];
        }

        public async Task<PaymentResultDto> ProcessPayment(decimal amount, string PaymentToken)
        {
            try
            {
                StripeConfiguration.ApiKey = _secretKey;

                var options = new ChargeCreateOptions
                {
                    Amount = (long)(amount * 100),
                    Currency = "inr",
                    Source = PaymentToken,  // Use token from client
                    Description = "Booking Payment"
                };

                var service = new ChargeService();
                var charge = await service.CreateAsync(options);

                if (charge.Status == "succeeded")
                {
                    return new PaymentResultDto { IsSuccessful = true };
                }

                return new PaymentResultDto { IsSuccessful = false, ErrorMessage = "Payment failed." };
            }
            catch (Exception ex)
            {
                return new PaymentResultDto { IsSuccessful = false, ErrorMessage = ex.Message };
            }
        }
    }

}*/
