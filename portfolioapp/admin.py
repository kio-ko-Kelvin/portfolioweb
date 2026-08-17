from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Profile,
    Project,
    Skill,
    Service,
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "profession",
        "email",
        "phone",
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "percentage",
    )

    list_editable = (
        "percentage",
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
        "created",
        "technologies"
    )

    list_filter = (
        "created",
    )

    search_fields = (
        "title",
        "description",
        "technologies",
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

        (
            "Technology",
            {
                "fields": (
                    "technologies",
                )
            },
        ),
    )

