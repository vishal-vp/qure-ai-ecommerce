# Generated by Django 4.2.11 on 2024-04-23 16:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PurchaseItem',
            new_name='Item',
        ),
        migrations.AlterModelManagers(
            name='user',
            managers=[
            ],
        ),
    ]
