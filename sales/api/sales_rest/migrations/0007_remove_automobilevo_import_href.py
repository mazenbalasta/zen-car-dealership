# Generated by Django 4.0.3 on 2023-12-19 22:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0006_alter_automobilevo_import_href'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='import_href',
        ),
    ]
