using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class AddedStationFieldToReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BikeStationID",
                table: "Reservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_BikeStationID",
                table: "Reservations",
                column: "BikeStationID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_BikeStations_BikeStationID",
                table: "Reservations",
                column: "BikeStationID",
                principalTable: "BikeStations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_BikeStations_BikeStationID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_BikeStationID",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "BikeStationID",
                table: "Reservations");
        }
    }
}
