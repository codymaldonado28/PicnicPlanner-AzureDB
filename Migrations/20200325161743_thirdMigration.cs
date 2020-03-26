using Microsoft.EntityFrameworkCore.Migrations;

namespace PicnicPlanner3.Migrations
{
    public partial class thirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Runways_Airports_AirportId",
                table: "Runways");

            migrationBuilder.DropIndex(
                name: "IX_Runways_AirportId",
                table: "Runways");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Runways_AirportId",
                table: "Runways",
                column: "AirportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Runways_Airports_AirportId",
                table: "Runways",
                column: "AirportId",
                principalTable: "Airports",
                principalColumn: "AirportId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
