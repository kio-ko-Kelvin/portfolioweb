from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Profile,
    Project,
    Service,
    Contact,
)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "profession",
        "email",
        "phone",
    )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "description",
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "description",
        "created",
    )

    list_filter = (
        "created",
    )

    search_fields = (
        "title",
        "description",
    )

    fieldsets = (
        (
            "Project Information",
            {
                "fields": (
                    "title",
                )
            },
        ),

        (
            "Descriptions",
            {
                "fields": (
                    "description",
                )
            },
        ),

        (
            "Image",
            {
                "fields": (
                    "image",
                )
            },
        ),

        (
            "Links",
            {
                "fields": (
                    "github_url",
                    "live_demo",
                )
            },
        ),
    )


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = (
        "fullname",
        "emailsubject",
        "message",
    )