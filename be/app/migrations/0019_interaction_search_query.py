# Generated by Django 5.0.3 on 2024-06-07 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0018_remove_orderitem_is_refund_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='interaction',
            name='search_query',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
