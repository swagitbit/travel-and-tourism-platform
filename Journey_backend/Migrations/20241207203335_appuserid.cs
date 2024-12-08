using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Journey.Migrations
{
    /// <inheritdoc />
    public partial class appuserid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_AspNetUsers_ContactDetails",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_ContactDetails",
                table: "Listings");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_AspNetUsers_PhoneNumber",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Roles",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "ContactDetails",
                table: "Listings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ContactDetails",
                table: "Listings",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Roles",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_AspNetUsers_PhoneNumber",
                table: "AspNetUsers",
                column: "PhoneNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_ContactDetails",
                table: "Listings",
                column: "ContactDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_AspNetUsers_ContactDetails",
                table: "Listings",
                column: "ContactDetails",
                principalTable: "AspNetUsers",
                principalColumn: "PhoneNumber",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
