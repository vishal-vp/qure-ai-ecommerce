from django.db import models
from django.contrib.auth.models import User


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserProfile(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile_number = models.CharField(max_length=20)
    address = models.TextField()


class Product(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=8)
    image_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name


class PurchaseItem(TimeStampedModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()


class Cart(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(PurchaseItem)


class Order(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    products = models.ManyToManyField(PurchaseItem)
