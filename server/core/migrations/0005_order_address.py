# Generated by Django 4.2.11 on 2024-04-24 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_cart_products_remove_order_products_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.TextField(default=None),
            preserve_default=False,
        ),
    ]