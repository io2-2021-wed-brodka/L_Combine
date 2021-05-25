using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.DTO
{
    /// <summary>
    /// Według specyfikacji jest to klasa ReservedBikeDTO.
    /// Zmienilismy nazwę, ponieważ uważamy, że jest ona zbyt podobna do BikeDTO i wprowadza w błąd.
    /// Ta kalsa opisuje tak na prawde rezerwację.
    /// </summary>
    public class ReservationDTO
    {
        public string Id { get; set; }
        public StationDTO Station { get; set; }

        public DateTime ReservedAt { get; set; }
        public DateTime ReservedTill { get; set; }
    }
}
