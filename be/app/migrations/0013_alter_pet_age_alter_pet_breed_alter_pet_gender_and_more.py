# Generated by Django 5.0.3 on 2024-05-31 11:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_pet_gender_pet_species_item_stock_image_image_tag_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='age',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='pet',
            name='breed',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='app.pet_breed'),
        ),
        migrations.AlterField(
            model_name='pet',
            name='gender',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='app.pet_gender'),
        ),
        migrations.AlterField(
            model_name='pet',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='pet',
            name='species',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='app.pet_species'),
        ),
    ]
